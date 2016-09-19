package com.cmpe273.homework1.java;

import java.util.*;

public class Queues_Logic 
{ 	
	Queue<String> queue = new LinkedList<String>();
	public void addString(String s) throws Exception
	{
		queue.add(s);
	}
	
	public String getElement() throws Exception
	{
		return queue.element().toString();
	}
	
	public void removeObject() throws Exception
	{
		queue.remove();
	}

}
