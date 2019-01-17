#!/bin/bash

API="http://localhost:4741"
URL_PATH="/likes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "like": {
      "interests": "'"${INTERESTS}"'",
      "fiveFaves": "'"${FAVES}"'",
      "personalityTypes": "'"${PTYPES}"'",
      "genderPrefs": "'"${GPREFS}"'",
      "searchingFor": "'"${SEARCHING}"'",
    }
  }'

echo
