# Pace
Pace is a simple data-source server that handles authentication, access, and
modification of resources. Data sources can be exposed and managed without
exposing the data sources to the world, while also allowing authorized
applications or users to access the data.

With configuration options, access control can be done on a granular scale
without compromising on the availability of data.

## Data Formats
* JSON Web Endpoints - Endpoints accessible to the server via HTTP(s) requests
with configurable authentication
* JSON Object - Hardcoded JSON Objects that can be served as a data source
