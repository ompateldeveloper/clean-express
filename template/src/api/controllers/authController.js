import { generateToken } from "../utils/generateToken.js";
import { prisma } from "../utils/prisma.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import bcrypt from "bcrypt";
const authController = {
    async signin(req, res) {
        try {
            const body = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            if (!user || !(await bcrypt.compare(body.password, user.password))) {
                return res.status(401).json({ message: ["Invalid credentials"] });
            }

            const token = generateToken(user);
            const sanitizedUser = sanitizeUser(user);
            return res.apiSuccess({ data: { token, ...sanitizedUser } });
        } catch (error) {
            return res.apiError({ error });
        }
    },
    async signup(req, res) {
        const body = req.body;
        const exists = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (exists) {
            return res.apiError({ error: "User Already Exists", status: 403 });
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        try {
            const user = await prisma.user.create({
                data: {
                    ...body,
                    password: hashedPassword,
                },
            });
            const token = generateToken(user);
            const sanitizedUser = sanitizeUser(user);
            return res.apiSuccess({ data: { token, ...sanitizedUser } });
        } catch (error) {
            return res.apiError({ error });
        }
    },

    async me(req, res) {},
};
export { authController };
