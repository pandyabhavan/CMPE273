package com.cmpe273.homework1.java;

import java.util.Scanner;

import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class Stacks {

	@SuppressWarnings("resource")
	public static void main(String[] args) 
	{
		try
		{
		      System.out.print("Enter a String: ");
		      String n = new Scanner(System.in).next();
		      System.out.println("Reversed String: "+new Stack_Logic().reverseString(n));
		      
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
