package com.lab3.ebay;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class Profile 
{
	@WebMethod
	public String getPurchaseHistory(String user_id) 
	{
		return MySQL.fetchData("select u.first_name,i.name,i.description,i.price,b.quantity,b.purchase_date from user u,item i,buy_sell b where b.buyer_id = "+user_id+" and u.id = i.user_id and i.id = b.item_id");
	}
	
	@WebMethod
	public String getSellingHistory(String user_id)
	{
		return MySQL.fetchData("select id,name,description,price,quantity_remaining from item where user_id = "+user_id+" and view=1");
	}
	
	@WebMethod
	public int removeItem(String item_id)
	{
		return MySQL.updateData("update item set view=0 where id="+item_id+"");
	}
	
	@WebMethod
	public String getProfile(String user_id)
	{
		return MySQL.fetchData("select first_name,last_name,email,birth_day,contact,address1,address2,city,state,pin_code from user u left join user_details ud on u.id where u.id ="+user_id+"");
	}
}
