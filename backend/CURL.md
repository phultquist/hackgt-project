# Curls
The goal is to update be able to set `broken` to `true` for any product in the catalog.

## Create Catalog Item with `broken` set to `false`
```curl
curl --location --request PUT 'https://api.ncr.com/catalog/v2/items/newId5' \
--header 'Content-Type: application/json' \
--header 'Authorization: AccessKey 2e1f6f77e9674006838270fcb95477f7:+icdgYg07Z3E4l7ZxbhFMl0ZXoGGyJl2ZnzNbfjWiMzrOF6O/rC/cESH8LGS7IOMAHsUgnGhKr2PauUJ3T3Zwg==' \
--header 'nep-organization: test-drive-890477f1b75e491b910d3' \
--header 'Date: Sat, 23 Oct 2021 18:10:06 GMT' \
--header 'Accept: application/json' \
--header 'Accept-Language: en-us' \
--data-raw '{
    "version": 1,
    "packageIdentifiers": [
        {
            "type": "Type_1",
            "value": "value_1"
        }
    ],
    "longDescription": {
        "values": [
            {
                "locale": "en-US",
                "value": "Banana"
            },
            {
                "locale": "fr-ca",
                "value": "Sample text in French Canadian"
            },
            {
                "locale": "en-br",
              "value": "Banana"
            }
        ]
    },
    "shortDescription": {
        "values": [
            {
                "locale": "en-US",
                "value": "Banana"
            },
            {
                "locale": "fr-ca",
                "value": "Sample text in French Canadian"
            },
            {
                "locale": "en-br",
                "value": "Banana"
            }
        ]
    },
    "merchandiseCategory": {
        "nodeId": "1-846-188-450"
    },
    "alternateCategories": [
        {
            "nodeId": "1-846-188-450"
        }
    ],
    "status": "INACTIVE",
    "departmentId": "7834971",
    "nonMerchandise": null,
    "familyCode": "7328971",
    "referenceId": "8320221",
    "manufacturerCode": "467432341",
    "externalIdentifiers": [
        {
            "type": "NACS_CODE",
            "value": "3031"
        }
    ],
    "posNumber": "123",
    "dynamicAttributes": [
        {
            "type": "String",
            "attributes": [
                {
                    "key": "brokenDate",
                    "value": "Oct 21 2021"
                },
                {
                    "key": "broken",
                    "value": "false"
                }
            ]
        }
    ]
}'
```

## Set Item Attribute *not working*

See `dynamicAttributes`, which is suppposed to update the value, but is not working
```curl
curl --location --request PUT 'https://api.ncr.com/catalog/v2/item-attributes/newId2' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Accept-Language: en-us' \
--header 'Authorization: AccessKey 2e1f6f77e9674006838270fcb95477f7:+icdgYg07Z3E4l7ZxbhFMl0ZXoGGyJl2ZnzNbfjWiMzrOF6O/rC/cESH8LGS7IOMAHsUgnGhKr2PauUJ3T3Zwg==' \
--header 'nep-organization: test-drive-890477f1b75e491b910d3' \
--header 'Date: Sat, 23 Oct 2021 18:10:06 GMT' \
--header 'nep-enterprise-unit: 99542b3de23a4af6a7361c2075769813' \
--data-raw '{
    "version":79,
    "blockForSale":false,
    "merchandiseCategory":
    {
        "nodeId": "1-846-188-450"
    },
    "status":"INACTIVE",
    "dynamicAttributes":[{
            "type": "String",
            "attributes": [
                {
                    "key": "brokenDate",
                    "value": "May 10 2021"
                },
                {
                    "key": "broken",
                    "value": "true"
                }
            ]
        }],
    "groups":[],
    "linkGroups":[],
    "imageUrls":[],
    "regulatoryMessages":[]
}'
```