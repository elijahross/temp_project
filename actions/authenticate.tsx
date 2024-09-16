"use server"
import {PrismaClient} from '@prisma/client';
import { cookies} from 'next/headers';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export async function auth() {
    // Visitor ID is stored in the cookies and is used to identify new visitors

    // Check if there is a visitor ID in the cookies
    const visitor = cookies().get("visitor")?.value;
    if (!visitor) {
        try{
        const visitorId = randomUUID();
        // If not -> new visitor is created and his id is stored in the cookies
        const user = await prisma.visitor.create({
            data: {
                visitorId
            }
        });
        await prisma.view.create({
            data: {
                visitorId: user.id
            }
        });

        // Get all data from the database
        const visitors = await prisma.visitor.findMany();
        const views = await prisma.view.findMany();

        // Close conneciton
        await prisma.$disconnect();
        
        // Cookie expiration date is set to 30 days
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        cookies().set("visitor", user.id.toString(), { expires, httpOnly: true });
        return {status: "200", message: "INFO: User created!", visit: visitors, view: views, user: user};
        } catch (e) {
            return {status: "500", message: "ERROR: Could not connect to the database. Please try again later."};
        }
    } else {
        try{
        // If visitor ID is present in the cookies -> visits counter in the database is incremented
        const user = await prisma.visitor.update({
            where: {
                id: parseInt(visitor)
            },
            data: {
                visits: {
                    increment: 1
                }
            }
        });
        await prisma.view.create({
            data: {
                visitorId: user.id
            }
        });

        // Get all data from the database
        const visitors = await prisma.visitor.findMany();
        const views = await prisma.view.findMany();

        // Close conneciton
        await prisma.$disconnect();

        // Cookie expiration date is set to 30 days
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        cookies().set("visitor", user.id.toString(), { expires, httpOnly: true });
        return {status: "200", message: "INFO: Authentication Succsessful!", visit: visitors, view: views, user: user};
        } catch (e) {
            return {status: "500", message: "ERROR: Could not connect to the database. Please try again later."};
        }
    }

}