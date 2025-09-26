Swagger URL : 
UserMs: http://localhost:8081/swagger-ui/index.html#/
ProfileMS: ProfileMS: http://localhost:8082/swagger-ui/index.html#/
AppointmentMS: http://localhost:8083/swagger-ui/index.html#/
MasterMS: http://localhost:8084/swagger-ui/index.html#/

List of Microservices : With GateWay Mapping
#UserMs
spring.cloud.gateway.routes[0].id=UserMs
spring.cloud.gateway.routes[0].uri=http://localhost:8081
spring.cloud.gateway.routes[0].predicates[0]=Path=/user/**
spring.cloud.gateway.routes[0].filters[0]=TokenFilter

#ProfileMS
spring.cloud.gateway.routes[1].id=ProfileMS
spring.cloud.gateway.routes[1].uri=http://localhost:8082
spring.cloud.gateway.routes[1].predicates[0]=Path=/profile/**
spring.cloud.gateway.routes[1].filters[0]=TokenFilter

#AppointmentMS
spring.cloud.gateway.routes[2].id=AppointmentMS
spring.cloud.gateway.routes[2].uri=http://localhost:8083
spring.cloud.gateway.routes[2].predicates[0]=Path=/appointment/**
spring.cloud.gateway.routes[2].filters[0]=TokenFilter

#MasterMS
spring.cloud.gateway.routes[3].id=MasterMS
spring.cloud.gateway.routes[3].uri=http://localhost:8084
spring.cloud.gateway.routes[3].predicates[0]=Path=/master/**
spring.cloud.gateway.routes[3].filters[0]=TokenFilter

Git Commands to checkin the code : From root folder execute below commands
Owner Commands : 
Get Updates : git pull
Get List of Updated files in local : git status
Make changes ready for commit : git commit -m "Updates"
Code Merge : git push

Team Members Commands: