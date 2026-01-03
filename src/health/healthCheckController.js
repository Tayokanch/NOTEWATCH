
export const healthCheckController = async (req, res) => {
    try {
        return res.status(200).send("OK");
    } catch (err) {
        console.error(err);
        return res.status(400);
    }
};
