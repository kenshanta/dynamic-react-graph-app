app.post('/api/extract', upload.single('file'), async (req, res) => {
  logInfo('POST /api/extract', req.body);
  logInfo('FILE=', req.file);

  if (req.body) {
    const file = req.file;
    const requestID = req.body.requestID;
    const project = req.body.project;
    const idUser = req.body.userID;
    const user = await User.findOne(idUser);

    if (requestID && project && idUser && user) {
      logDebug('User with role ' + user.role, user);
      if (user.role === 'ADVISOR' || user.role.indexOf('ADVISOR') > -1)
        return res.json({ requestID, step: 999, status: 'DONE', message: 'Nothing to do for ADVISOR role' });


      await db.updateStatus(requestID, 1, '');

      logDebug('CONFIG:', config.projects);
      if (project === 'inkasso' && config.projects.hasOwnProperty(project) && file) {
        const hashSum = crypto.createHash('sha256');
        const fileHash = idUser;
        const fileName = 'fullmakt';
        const fileType = mime.getExtension(file.mimetype);
        if (fileType !== 'pdf')
          return res.status(500).json({ requestID, message: 'Missing pdf file' });
        await db.updateStatus(requestID, 3, '');

        const folder = `${project}-signed/${idUser}`;
        logDebug('FILE2=', file);
        await uploadToGCSExact(folder, fileHash, fileName, fileType, file.mimetype, file.buffer);
        await db.updateStatus(requestID, 4, '');
        const ret = await db.updateUploadedDocs(idUser, requestID, fileName, fileType, file.buffer);
        logDebug('DB UPLOAD:', ret);
        await db.updateStatus(requestID, 5, '');

        let sent = true;
        const debtCollectors = await db.getDebtCollectors();
        logDebug('debtCollectors=', debtCollectors);
        if (!debtCollectors)
          return res.status(500).json({ requestID, message: 'Failed to get debt collectors' });

        if (!!(await db.hasUserRequestKey(idUser))) { //FIX: check age, not only if there's a request or not
          return res.json({ requestID, step: 999, status: 'DONE', message: 'Emails already sent' });
        }

        const sentStatus = {};
        for (let i = 0; i < debtCollectors.length; i++) {
          await db.updateStatus(requestID, 10 + i, '');
          const idCollector = debtCollectors[i].id;
          const collectorName = debtCollectors[i].name;
          const collectorEmail = debtCollectors[i].email;
          const hashSum = crypto.createHash('sha256');
          const hashInput = `${idUser}-${idCollector}-${(new Date()).toISOString()}`;
          logDebug('hashInput=', hashInput);
          hashSum.update(hashInput);
          const requestKey = hashSum.digest('hex');
          logDebug('REQUEST KEY:', requestKey);

          const hash = Buffer.from(`${idUser}__${idCollector}`, 'utf8').toString('base64')

          if (!!(await db.setUserRequestKey(requestKey, idUser))
            && !!(await db.setUserCollectorRequestKey(requestKey, idUser, idCollector))) {

            /* prepare email */
            const sendConfig = {
              sender: config.projects[project].email.sender,
              replyTo: config.projects[project].email.replyTo,
/*COMMENT: missing semi-column that crashes the code */    subject: 'Email subject,
                            templateId: config.projects[project].email.template.collector,
              params: {
                downloadUrl: `https://url.go/download?requestKey=${requestKey}&hash=${hash}`,
                uploadUrl: `https://url.go/upload?requestKey=${requestKey}&hash=${hash}`,
                confirmUrl: `https://url.go/confirm?requestKey=${requestKey}&hash=${hash}`
              },
              tags: ['request'],
              to: [{ email: collectorEmail, name: collectorName }],
            };
            logDebug('Send config:', sendConfig);

            try {
              await db.setEmailLog({ collectorEmail, idCollector, idUser, requestKey })
            } catch (e) {
              logDebug('extract() setEmailLog error=', e);
            }

            /* send email */
            const resp = await email.send(sendConfig, config.projects[project].email.apiKey);
            logDebug('extract() resp=', resp);

            // update DB with result
            await db.setUserCollectorRequestKeyRes(requestKey, idUser, idCollector, resp);

            if (!sentStatus[collectorName])
              sentStatus[collectorName] = {};
            sentStatus[collectorName][collectorEmail] = resp;

            if (!resp) {
              logError('extract() Sending email failed: ', resp);
            }
          }
        }
        await db.updateStatus(requestID, 100, '');

        logDebug('FINAL SENT STATUS:');
        console.dir(sentStatus, { depth: null });

        //if (!allSent)
        //return res.status(500).json({requestID, message: 'Failed sending email'});

        await db.updateStatus(requestID, 500, '');

        /* prepare summary email */
        const summaryConfig = {
          //bcc: [{ email: 'tomas@inkassoregisteret.com', name: 'Tomas' }],
          sender: config.projects[project].email.sender,
          replyTo: config.projects[project].email.replyTo,
          subject: 'Oppsummering Kravsforespørsel',
          templateId: config.projects[project].email.template.summary,
          params: {
            collectors: sentStatus,
          },
          tags: ['summary'],
          to: [{ email: 'tomas@upscore.no', name: 'Tomas' }], // FIXXX: config.projects[project].email.sender
        };
        logDebug('Summary config:', summaryConfig);

        /* send email */
        //const respSummary = await email.send(sendConfig, config.projects[project].email.apiKey);
        //logDebug('extract() summary resp=', respSummary);

        await db.updateStatus(requestID, 900, '');
      }
      await db.updateStatus(requestID, 999, '');
      return res.json({ requestID, step: 999, status: 'DONE', message: 'Done sending emails...' });
    } else
      return res.status(500).json({ requestID, message: 'Missing requried input (requestID, project, file)' });
  }
  res.status(500).json({ requestID: '', message: 'Missing requried input (form data)' });
});
