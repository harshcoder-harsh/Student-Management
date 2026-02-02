export const successResponse = (res: any, data: any, statusCode: number = 200) => {
    return res.status(statusCode).json({
        status: 'success',
        data
    });
};
