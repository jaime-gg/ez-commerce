# EZ-COMMERCE: An E-commerce Back End
I was tasked with developing the back end of am e-commerce site, which are known for specializing in internet retail. This assignment pushed to to utilize the skills I have learned to hone over the past few assignments by taking a working Express.js API and configure it to use Sequelize to interact with a MySQL database.

By following the instructions I was able to efficiently go though the provided files and append the necessary code for a functional back-end. First it was by successfully initiating a database in conjunction with both the provided SCHEMA.SQL and the connection file that was supported by an .ENV file. Then I went through the models and added the desired columns, followed by developing the needed associations, and was finished when I developed functional api routes that created, pulled, updated, and deleted data.  

## Given: User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Given: Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## Walkthrough
As part of this assignment I had to include a [WALKTHROUGH](https://drive.google.com/file/d/1IEvlXY_5WGAdmwBazQUYX6WgNqEY-QPO/view) that demonstrated the functionality of the e-commerce back-end.

## Usage

After cloning this repo, start off by using the command line to 'npm i', since you’ll need to use the [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect the Express.js API to a MySQL database, and the [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables to store sensitive data, like your MySQL username, password, and database name. An example of the formatting of this .ENV file will be included in with this repo. 

Use the `schema.sql` file in the `db` folder to create your database using MySQL shell commands. I modified the provided file so that it will automatically begin using the database whenever this file is run using 'SOURCE db/schema.sql'. Finally, you must use environment variables to store sensitive data, like your MySQL username, password, and database name.

## Review

* Walkthrough Video Link: https://drive.google.com/file/d/1IEvlXY_5WGAdmwBazQUYX6WgNqEY-QPO/view 

* GitHub Repo: https://github.com/jaime-gg/ez-commerce 
