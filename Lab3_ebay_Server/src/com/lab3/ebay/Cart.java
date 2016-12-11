package com.lab3.ebay;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class Cart 
{
	@WebMethod
	public String getCart(String user_id) 
	{
		return MySQL.fetchData("select c.quantity,i.name,i.description,u.first_name,i.price,i.id from cart c,item i,user u where u.id = i.user_id and c.item_id = i.id and u.id = "+user_id+" and ((i.view=1 and i.bid=0) or (i.view =0 and bid=1))");
	}
	
	@WebMethod
	public int removeFromCart(String user_id,String item_id)
	{
		return MySQL.updateData("delete from cart where item_id="+item_id+" and user_id="+user_id+"");
	}
}
