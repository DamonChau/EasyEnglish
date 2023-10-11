
FROM node:18-alpine
ENV NODE_ENV=development
WORKDIR /easyenglish
COPY public/ /easyenglish/public
COPY src/ /easyenglish/src
COPY package.json /easyenglish/
COPY yarn.lock /easyenglish/
RUN yarn install
COPY . .
CMD ["npm", "start"]