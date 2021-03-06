package com.cmpe273.homework1.java;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class Queues_JUnit 
{
	private String img1 = "image1";
	private String img2 = "image2";
	private Queues_Logic ql = new Queues_Logic();
	
	@Test
	public void testAddQueue() throws Exception
	{
		ql.addString(img1);
		ql.addString(img2);
		assertEquals(img1,ql.getElement());
	}
	
	@Test
	public void testRemoveQueue() throws Exception
	{
		ql.addString(img1);
		ql.addString(img2);
		ql.removeObject();
		assertEquals(img2, ql.getElement());
	}
}
