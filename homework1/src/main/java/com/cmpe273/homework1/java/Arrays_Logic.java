package com.cmpe273.homework1.java;

public class Arrays_Logic 
{
	int a[][] = {{20,20,20,21,21},{24,23,24,23,23},{19,19,20,19,20}};
	int[][] b;
	
	public int[][] convertValues()
	{
		b = new int[3][5];
		for(int i=0;i<3;i++)
		{
			for(int j=0;j<5;j++)
			{
				b[i][j]= (int)(9.0/5.0)*a[i][j] + 32;
				System.out.println(b[i][j]);
			}
		}
		return b;
	}
}
