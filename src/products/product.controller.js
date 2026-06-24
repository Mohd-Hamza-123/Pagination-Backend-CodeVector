import prisma from "../db/prisma.js"

export const getProducts = async (req, res) => {
    const products = await prisma.products.findMany()
    return res.json(products).status(200)
}

export const addProducts = async (req, res) => {
    return res.json({
        success: true,
    }).status(201)
}