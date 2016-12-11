package com.lab3.ebay;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class Product 
{
	@WebMethod
	public String getProductDetails(String item_id)
	{
		return MySQL.fetchData("select i.id,name,description,price,quantity_remaining,u.first_name,ud.state,i.bid,b.highest_bid,last_date from item i left join bidding b on i.id = b.item_id,user u, user_details ud where i.user_id = u.id and u.id = ud.user_id and view = 1 and  i.id = "+item_id+"");
	}
	
	@WebMethod
	public int add_to_cart(String user_id,String item_id,String quantity)
	{
		return MySQL.updateData("insert into cart values("+user_id+","+item_id+","+quantity+")");
	}	
}
