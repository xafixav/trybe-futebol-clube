import IUser from "../../interfaces/IUser";

export const adminCorrect: IUser = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
};

export const adminIncorrect: IUser = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@ain.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
};

export const adminToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjUxNjkyOTAxLCJleHAiOjE2NTE3NzkzMDF9.U00PBBopwY1v6zpYCk1U6ic4qTzdb-J8Ns44_s9avi4";

export const TokenInvalidSignature: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjUxNjkyOTAxLCJleHAiOjE2NTE3NzkzMDF9.U00PBBopwY1v6zpYCk1U4qTzdb-J8Ns44_s9avi4"

export const TokenInvalid: string = "eyJhbGciOiJIUzINiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjUxNjkyOTAxLCJleHAiOjE2NTE3NzkzMDF9.U00PBBopwY1v6zpYCk1U6ic4qTzdb-J8Ns44_s9avi4"

export const TokenMalformed: string = "asdas32323"