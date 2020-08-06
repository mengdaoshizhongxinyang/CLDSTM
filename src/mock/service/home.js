import Mock from 'mockjs2'
import { builder } from '../util'

const Home = (options) => {
    const result={
        "msg":"",
        "data":configs.get
    }
    return builder(result)
}


Mock.mock(/\/api\/Home/, 'post', Home)

