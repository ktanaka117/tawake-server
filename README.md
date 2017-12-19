```
$ aws dynamodb create-table \
--endpoint-url http://127.0.0.1:8000 \
--table-name Contents \
--attribute-definitions AttributeName=content_id,AttributeType=S AttributeName=tags,AttributeType=S \
--key-schema AttributeName=content_id,KeyType=HASH \
--global-secondary-indexes IndexName=tags,KeySchema=["{AttributeName=tags,KeyType=HASH}"],Projection="{ProjectionType=ALL}",ProvisionedThroughput="{ReadCapacityUnits=5,WriteCapacityUnits=5}" \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```