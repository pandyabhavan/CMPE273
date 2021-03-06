package com.cmpe273.homework1.java;

import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class Generic_Class<T> 
{
	private T type;
	public T get()
	{
		return this.type;
	}
	public void set(T type)
	{
		this.type = type;
	}
	
	public static void main(String[] args)
	{
		try
		{
			Result result = JUnitCore.runClasses(Stack_JUnit.class);
		      for (Failure failure : result.getFailures()) 
		      {
		         System.out.println(failure.toString());
		      }
		      System.out.println(result.wasSuccessful());
		}
		catch(Exception e)
		{
			System.out.println("Error Occured: "+e.getMessage());
		}
	}
}