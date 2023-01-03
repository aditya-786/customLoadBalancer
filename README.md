# customLoadBalancer

Implemented Custom Load Balancer using Consistent Hashing

To run this:

1. Run application servers on 5 ports: 3000,3001,...,3004
eg: PORT=3000 node application_server.js

2. Now run the load balancer
eg: node load_balancer.js

3. Now send requests to port 80 with unique reqId, because we are using reqId for the consistent using.
eg: localhost:80?reqId=123

Thanks :)
