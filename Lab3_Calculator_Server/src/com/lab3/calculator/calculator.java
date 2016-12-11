package com.lab3.calculator;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class calculator 
{
	@WebMethod
	public int calculate(int number1,int number2,String operation)
	{
		try
		{
			if(operation.equals( "Addition"))
			{
				System.out.println(number1 + number2);
				return number1 + number2 ;
			}
			else if(operation.equals("Substraction"))
			{
				return number1 - number2 ;
			}
			else if(operation.equals("Multiplication"))
			{
				return number1 * number2 ;
			}
			else if(operation.equals("Division"))
			{
				return number1 / number2 ;
			}
			else
			{
				return -1;
			}
		}
		catch (Exception e) 
		{
			System.out.println(e.getMessage());
			return -1;
		}
	}
}
