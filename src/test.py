import requests

url = 'http://fleetapi-th.cartrack.com/rest/vehicles/events?start_timestamp=2022-05-05%2000:00:00&end_timestamp=2022-05-05%2023:59:59'
req = requests.get(url, auth=('SRIW00002','Riws@0ii'))
res = req.json()
print(res)