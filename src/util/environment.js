const PRODUCTION = {
        BASE_URL: "http://34.206.71.177"
};

const DEVELOPMENT = {
        BASE_URL:"http://52.54.56.68"
    }

const Environments = {
    development() {
        return DEVELOPMENT;
    },

    production() {
        return PRODUCTION;
    }
};

export default Environments;