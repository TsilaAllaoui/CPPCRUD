#include <stdlib.h>
#include <iostream>
#include <cstring>
#include <mysql_connection.h>
#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>
#include <json.hpp>

void tolower_case(std::string &input);

int main(int argc, char **argv)
{
	nlohmann::json request(nlohmann::json::parse(std::cin));

	//nlohmann::json request;
	//request["hostname"] = "127.0.0.1";
	//request["port"] = "3306";
	//request["username"] = "root";
	//request["password"] = "";

	std::string hostname = request["hostname"];
	std::string port = request["port"];
	std::string username = request["username"];
	std::string password = request["password"];

	try 
	{
		sql::Driver *driver;
		sql::Connection *con;
		sql::Statement *stmt;
		sql::ResultSet *res;

		driver = get_driver_instance();
		con = driver->connect("tcp://" + hostname + ":" + port, username, password);

		con->setSchema("products");

		stmt = con->createStatement();
		res = stmt->executeQuery("select * from items");

		nlohmann::json response;

		while (res->next())
		{
			auto res_meta = res->getMetaData();
			nlohmann::json entry;
			for (int i = 1; i <= res_meta->getColumnCount(); i++)
			{
				std::string str = "";
				str = res_meta->getColumnName(i).asStdString();
				tolower_case(str);
				entry[str] = res->getString(i);
			}
			response.emplace_back(entry);
		}

		delete res;
		delete stmt;
		delete con;

		std::cout << "Content-type: application/json\r\n\r\n";

		std::cout << response.dump(2);
	}

	catch (sql::SQLException &e) 
	{
		std::cout << "# ERR: SQLException in " << __FILE__;
		std::cout << "(" << __FUNCTION__ << ") on line " << __LINE__ << std::endl;
		std::cout << "# ERR: " << e.what();
		std::cout << " (MySQL error code: " << e.getErrorCode();
		std::cout << ", SQLState: " << e.getSQLState() << " )" << std::endl;
	}

	return 0;
}

void tolower_case(std::string &input)
{
	std::transform(input.begin(), input.end(), input.begin(),
		[](unsigned char c) { return std::tolower(c); });
}