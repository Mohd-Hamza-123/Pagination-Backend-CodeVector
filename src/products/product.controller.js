import { pool } from "../db/db.js"

export const getProducts = async (req, res) => {
    try {

        const category = req.query.category
        const limit = Number(req.query.limit) || 10
        const dbLimit = limit + 1 
        let cursorId = req.query.cursor?.id
        let cursorCreatedAt = req.query.cursor?.created_at
        let query = ``

        if (!category && !cursorId && !cursorCreatedAt) {
            query = `
            SELECT * FROM product
            ORDER BY created_at DESC, id DESC
            LIMIT ${dbLimit};
            `
        } else if (category && !cursorId && !cursorCreatedAt) {
            query = `
            SELECT * FROM product
            WHERE category = '${category}'
            ORDER BY created_at DESC, id DESC
            LIMIT ${dbLimit};
            `
        } else if (!category && cursorId && cursorCreatedAt) {
            query = `
            SELECT * FROM product
            WHERE (created_at < ${cursorCreatedAt} OR (created_at = ${cursorCreatedAt} AND id < ${cursorId}))
            ORDER BY created_at DESC, id DESC
            LIMIT ${dbLimit};
            `
        }
        else {
            query = `
            SELECT * FROM product
            WHERE category = '${category}' AND (created_at < ${cursorCreatedAt} OR (created_at = ${cursorCreatedAt} AND id < ${cursorId}))
            ORDER BY created_at DESC, id DESC
            LIMIT ${dbLimit};
            `
        }

        const result = await pool.query(query)
        cursorId = result.rows[result.rows.length - 1]?.id
        cursorCreatedAt = result.rows[result.rows.length - 1]?.created_at

        console.log(result.rows.length)
        let hasMore = true
        if(result.rows.length > limit){
            hasMore = true
        }else{
            hasMore = false
        }

        const nextCursor = {
            id: cursorId,
            created_at: cursorCreatedAt
        }

        return res.json({
            hasMore,
            nextCursor,
            data: result.rows,
            limit,
            success: true
        }).status(200)
    }

    catch (error) {
        console.error(error?.message)
        return res.json({
            message: error?.message,
            s: false
        }).status(500)
    }

}

export const addProducts = async (req, res) => {
    return res.json({
        success: true,
    }).status(201)
}