package com.cmpe273.homework1.java;
import static org.junit.Assert.*;

import org.junit.Test;

public class Arrays_JUnit 
{
	@Test
	public void testConversion()
	{
		int b[][] = {{52,52,52,53,53},{56,55,56,55,55},{51,51,52,51,52}};
		int a[][] = new Arrays_Logic().convertValues();
		
		for(int i=0;i<3;i++)
		{
			for(int j=0;j<5;j++)
			{
				assertEquals(b[i][j],a[i][j]);
			}
		}
	}
}
