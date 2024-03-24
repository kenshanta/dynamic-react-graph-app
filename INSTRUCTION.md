# Commands for app

### Install dependencies
```
npm install
```

### Build app
```
npm run build
```

### Runt linter
```
npm run lint
```

### Start app
```
npm run dev
```

# Recruitment task - coding

The main goal is implementing a small application that presents a line/bar chart with Norway statistics on the average
price per square meter fetched from https://data.ssb.no. Documentation is Norwegian - use your favourite translator if you need any.


## Requirements

- A user has to be able to provide parameters like quarters range and house type in a simple form. These parameters have to be reflected in
the URL so that users can share the URL with others. 
- UI should limit users from providing quarter values earlier than 2009K1.
- We want you to create a search history `on demand` in local storage. It means that after every search, you will ask the user if they want to save the search entry in the history.


### For example

- quarters range: 2016K1-2021K4
- house type: Småhus

| Type of property | API value |
|:-----------------|:---------:|
| Boliger i alt    |   '00'    |
| Småhus           |   '02'    |
| Blokkleiligheter |   '03'    |

### Example request to API

```
curl -X POST --location "https://data.ssb.no/api/v0/no/table/07241" \
-H "Content-Type: application/json" \
-d "{
        "query": [
            {
                "code": "Boligtype",
                "selection": {
                    "filter": "item",
                    "values": [
                        "00"
                    ]
                }
            },
            {
                "code": "ContentsCode",
                "selection": {
                "filter": "item",
                    "values": [
                        "KvPris"
                    ]
                }
            },
            {
                "code": "Tid",
                "selection": {
                    "filter": "item",
                    "values": [
                        "2020K1",
                        "2020K2",
                        "2020K3",
                        "2020K4",
                        "2021K1",
                        "2021K2",
                        "2021K3",
                        "2021K4"
                    ]
                }
            }
        ],
        "response": {
            "format": "json-stat2"
        }
    }"

```

## Libraries
We would like you to use some additional libraries for this task (included in package.json)
- material-ui
- react-hook-form
- You can choose your own Chart libraries. React Charts and MUI X Charts are just examples.

## Type-script
Please don't forget about typing!
