# Soulful - Questions and Answers
### Overview
An upgraded backend implementation for the web-based retail clothing application, ["Soulful", by ShamWow](https://github.com/ShamWow-FEC/soulful). A majority of the code is migrated from @Panlord's [fork of that repo](https://github.com/Panlord/SDC-muppets-QnA).

The original backend for the application could not handle increased server load the website was getting, so I (@Panlord) was tasked with scaling up the monolithic system to a more service-based architecture. Specifically, I had to handle the Questions-Answers section of the website.

### ETL
First, the following Question-Answer data was [migrated](https://github.com/Panlord/SDC-muppets-QnA/blob/main/server/questionsAnswers/database/ETL/questionsAnswersETL.sql) from the original database to a PostgreSQL one:
- 900,000 product entries
- 3.5 million question entries
- 6.9 million answer entries
- 2 million photo entries

### Stress Testing
Then, I deployed the server and database onto two Amazon Web Services EC2 instances and stress tested using Loader.io. The following results were (on average):
- GET requests: 70ms Latency at 100rps Throughput (0% error rate) | 1073ms Latency at 1000rps Throughput (0% error rate)
- POST requests: 446ms Latency at 1000rps Throughput (0% error rate)

### Optimization
Interpreting AWS's monitoring graphs, I concluded that the latency increases by 1400+% when the throughput increases 1000% because the CPU of the single EC2 instance running the server could not handle the increased load. Thus I opted to horizontally scale the system by deploying a copy of the server on another EC2 instance and then implemented an nginx load balancer on another separate EC2 instance. 

With the two servers and load balancer, I achieved the following measurements from further stress testing:
- GET requests: 78ms Latency at 1000rps Throughput (0.1% error rate)
- POST requests: 76ms Latency at 1000rps Throughput (0.1% error rate)

All errors occurred within stress testing were network errors. Once I added caching to the nginx server, more stress testing yielded the following results:
- GET requests: 77ms Latency at 1000rps Throughput (0% error rate)
- POST requests: 70ms Latency at 1000rps Throughput (0% error rate)
