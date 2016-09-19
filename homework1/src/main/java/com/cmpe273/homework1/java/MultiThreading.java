package com.cmpe273.homework1.java;

public class MultiThreading 
{
	public static void main(String[] args)
	{
		MultiThreadingTortoise t =  new  MultiThreadingTortoise();
		for(int i=0;i<100;i++)
		{
			if(i%10 == 0)
			System.out.println("Rabbit Covered: "+i);
		}
		t.stopThread();
		System.out.println("Rabbit Won");
	}
}