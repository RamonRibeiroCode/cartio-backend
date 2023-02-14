FROM node

WORKDIR /apps/cartio
# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
# COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install --legacy-peer-deps

RUN npx prisma generate

# Run and expose the server on port 5000
EXPOSE 5000

# A command to start the server
CMD npm run start:dev