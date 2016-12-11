package com.lab3.ebay;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class Login 
{
	@WebMethod
	public String login(String username,String password)
	{
		return MySQL.fetchData("select id,first_name,email,handle,last_login,password from user where (handle='"+username+"' or email='"+username+"')");
	}
	
	@WebMethod
	public int updateLastLogin(String query)
	{
		return MySQL.updateData(query);
	}
	
	@WebMethod
	public int register(String first_name,String last_name,String email,String password,String handle)
	{
		return MySQL.updateData("insert into user(first_name,last_name,email,password,handle,last_login) values('"+first_name+"','"+last_name+"','"+email+"','"+password+"','"+handle+"',now())");
	}
}
