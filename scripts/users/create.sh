#!/bin/bash

API="http://localhost:4741"
URL_PATH="/users"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "user": {
      "userName": "'"${USERNAME}"'",
      "location": "'"${LOCATION}"'",
      "about": "'"${ABOUT}"'",
      "genderIndentity": "'"${GIDENTITY}"'",
      "preferredPronoun": "'"${PRONOUN}"'",
    }
  }'

echo
