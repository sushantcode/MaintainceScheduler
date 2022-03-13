# Maintenace Scheduler
A fully developed and working prototype for a web application that can be used by assembly as well as manufacturing industries which need proper records of it's machinery maintenance in a systematic manner along with great UI. The prototype is developed using Java Spring Boot in backend and ReactJS in frontend.

## Features

- Properly registered user can sign in the application.
- Role-based authentication and authorization is implmented.
- All frontend routes and backend endpoints are restricted to certain group of users as per the need.
- All users and application data is stored in SQL database.
- It provides responsive web app UI to the users.
- Users sensitive information like password is encrypted before pushing to database.
- All users can update their basic user info and also change their password after logining into the system.
- User with admin access can add, remove, and reset password to other users.
- Some of the important use-cases related to machine maintenance are:
  -  Adding new machine in database
  -  Updating existing machine's information
  -  Recording new maintenance service to a particular machine
  -  Having dynamic access to the machine's part to add in the maintenance record
  -  Generating maintenance report of a particular machine by providing start and end date


## Getting Started

### Prerequisites

#### Tools used for this project:

- IntelliJ Idea
- VS Code
- JDK 11
- MySQL
- Docker
- Docker-compose
- Swagger 2

#### Dependencies are below:

##### Backend Dependencies
pom.xml
```
<dependencies>
<!--			General web dependencies                           -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<optional>true</optional>
		</dependency>

<!--			Authentication and Authorization dependencies		-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.session</groupId>
			<artifactId>spring-session-core</artifactId>
		</dependency>

<!--			Database dependencies								-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<scope>runtime</scope>
		</dependency>

<!--			Logging tools dependencies							-->
		<!-- Exclude Spring Boot's Default Logging -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
			<exclusions>
				<exclusion>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-logging</artifactId>
				</exclusion>
			</exclusions>
		</dependency>
		<!-- Add Log4j2 Dependency -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-log4j2</artifactId>
		</dependency>

<!--		Open PDF Dependency									-->
		<dependency>
			<groupId>com.github.librepdf</groupId>
			<artifactId>openpdf</artifactId>
			<version>1.3.26</version>
		</dependency>

<!--				Swagger 2 dependencies						-->
		<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger2 -->
		<dependency>
			<groupId>io.springfox</groupId>
			<artifactId>springfox-swagger2</artifactId>
			<version>2.9.2</version>
		</dependency>

		<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
		<dependency>
			<groupId>io.springfox</groupId>
			<artifactId>springfox-swagger-ui</artifactId>
			<version>2.9.2</version>
		</dependency>

<!--				Test dependencies									-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-test</artifactId>
			<scope>test</scope>
		</dependency>

	</dependencies>
  
```

##### Frontend Dependencies
package.json
```
    "@fortawesome/fontawesome-svg-core": "^1.3.0",
    "@fortawesome/free-solid-svg-icons": "^6.0.0",
    "@fortawesome/react-fontawesome": "^0.1.17",
    "@testing-library/jest-dom": "^5.16.2",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.25.0",
    "bootstrap": "^5.1.3",
    "downloadjs": "^1.4.7",
    "react": "^17.0.2",
    "react-bootstrap": "^2.1.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^6.2.1",
    "react-scripts": "5.0.0",
    "web-vitals": "^2.1.4"

```

### Some Screenshots of working application

Login Page            |  Change Password Dashboard
:-------------------------:|:-------------------------:
![login](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/login.png) | ![change_password](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/change_password.png)

Dashboard (Desktop)          |  Dashboard (Mobile)
:-------------------------:|:-------------------------:
![dashboard](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/dashboard.png) | ![res_dashboard](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/responsive_dashboard.png)

Admin Portal            |  User Profile
:-------------------------:|:-------------------------:
![admin](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/admin_portal.png) | ![profile](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/admin_profile.png)

Api Usages Tracking           |  Manage Users
:-------------------------:|:-------------------------:
![api_usages](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/api_usages.png) | ![manage_users](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/manage_users.png)

Existing Machine List (Desktop)    |  Existing Machine List (Mobile)
:-------------------------:|:-------------------------:
![machine_list](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/machine_list.png) | ![res_machine_list](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/responsive_machineList.png)

Select Machine Modal            |  Add New Maintenance
:-------------------------:|:-------------------------:
![machine_modal](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/machine_modal.png) | ![new_maintenance](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/new_maintenance.png)

Welcome Page            |  Generate Report Page
:-------------------------:|:-------------------------:
![welcome_page](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/welcome_page.png) | ![reports](https://github.com/sushantcode/MaintainceScheduler/blob/main/Screenshots/reports.png)

## Authors

* **Gupta, Sushant** - [Profile](https://github.com/sushantcode)

