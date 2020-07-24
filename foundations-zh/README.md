## 要求实现的细节

1. 格式识别是单纯的在两个正则里匹配，如果出现一个Log里有两种格式的也会被识别出来。我觉得在实际场景下应该是判断浏览器的类型然后选择对应的正则会好一些。
2. 单元测试是用Mocha和Chai
3. Lint有配置，直接extend了eslint:recommanded。
4. precommit, prepush和commitlint通过husky配置
5. CI为Github Action
