package com.lab3.ebay;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class Home 
{
	@WebMethod
	public String getTwoItems()
	{
		return MySQL.fetchData("select i.id,i.name,quantity,u.first_name from item i,user u where i.user_id = u.id order by id desc limit 2");
	}	
}
