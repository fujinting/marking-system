# marking-system



## 功能介绍

### 大概

本系统是莒南县钢城实验学校阅卷系统，开发者是本校老师付金廷。

本系统的主要功能如下：

①**登录**：管理员登录(加密和验证)(角色超管和普管，超管可注册普管)。

②**连接扫描仪**：(使用twain)，点击连接扫描仪，连接成功或失败后给提示，给出失败原因。

③**创建考试**：可以选择学校和年级创建一场考试，也可以查看历史考试记录。

④**导入学生和教师名单**：管理员可以导入学生和教师名单(xlsx)，导入考试学生名单(考号做唯一标识)(此时学生基本信息存入数据库(postgreSQL))，是为了计算每个学生的成绩。导入教师名单(手机号做唯一标识)(此时教师基本信息存入数据库)是为改卷前给教师分配主观题题组。(注意导入的excel均有格式要求)。

⑤**识别答题卡模板**(即某一科空白答题卡)：连接扫描仪成功后，将答题卡模板放入扫描仪，导入答题卡模板，系统呈现答题卡模板图像(正反，适应多类纸张)。

⑥**区域设置**：扫描仪识别后，管理员对答题卡模板进行边角符黑方块定位等操作。进行准考证号、选择题(ocr)(划分时适应多种类型区域)、主观题等等

 区域的定位和划分。

同时设置选择题题数、分数，主观题题组分数和内部题数等等。

 针对主观题，管理员设置题组的分数和题组区域的分割(openCV)(比如21和22题连着，可以切割成一个区域，叫做一个题组，可以分配给李老师，23题自己也可以成为一个题组，分配给王老师)，管理员设置将某个题组分给某个老师。
⑦**扫答题卡**：

 扫卷的数量、已扫答题卡图像，选择题的得分都要实时显示出来，包括扫卷时卡纸等等扫描仪和电脑问题出现失败要扫卷停止、提示和报错等
 系统在扫卷过程中，会出现图像倾斜、倒放、准考证损坏、选择题未涂等等非扫描仪和电脑问题，要给与管理员必要提示与解决方案。

 扫准考证号区域，系统可以识别出学生姓名和考号。

 针对选择题，系统可以验证对错得出分数(事先已设置)，可以将识别出的学生姓名和考号和选择题分数传给后端，后端匹配后， 保存这个学生选择题分数。

 针对主观题，系统扫完答题卡后就可以自己切割主观题题组分配给指定老师。

扫描完成可以查看各科扫描进度和答题卡数量。

⑧**教师登录**：凭借手机号登录网页(另一端)

⑨**教师阅卷**：教师看到被分配的对应题目，打分，可能是1分，也可能是6分(但是不会超过管理员设置的这个题组的分数)，回车后到下一个学生的那个题目，一直改完所有学生的本个题组，在此过程把所有学科的分数计算出来，存到后端(redis)。

管理员端可以看到评卷进度和记录。

⑩**导出成绩**：学生各科及总分系统计算出来后，管理员可以导出所有学生所有成绩。



## 项目介绍

主项目为**marking-system**，下面有四个子项目：
①**node-server**: 服务端，使用nodejs+express, 数据库使用PostgreSQL，提供后端服务，提供给前端接口并且连接数据库，进行crud，进行计算，进行识别主观题区域，判断客观题，总分计算等等诸多逻辑

②**vue-electron-admin**: 客户端，使用vue2+electron，主要是管理员进行教师和学生名单导入、进行客观题、主观题、准考证号等等区域的划分，进行选择题答案的设置，进行扫卷，进行成绩结果的导出等等

③**vue-teacher**: 客户端，浏览器网页，使用vue2+elementui，主要是教师进行阅卷(主观题)，打分
④**vue-student**: 客户端，浏览器网页，使用vue2+vant主要是学生通过姓名和身份证号后6位进行查成绩和成绩分析(**暂不开发**)









| 阶段                         | 时间区间        | 具体日期范围                            | 工作内容                                   | 具体任务                                                     |
| ---------------------------- | --------------- | --------------------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| 项目初始化与环境搭建         | 第 1 - 6 天     | 2025 年 3 月 19 日 - 2025 年 3 月 24 日 | 搭建开发环境，创建项目结构                 | 1. 安装 Node.js、Vue.js、Electron 等开发工具和框架 2. 创建 `marking - system` 主项目及 `node - server`、`vue - electron - admin`、`vue - teacher`、`vue - student` 子项目的基本结构 3. 配置开发环境，确保各子项目能正常运行 |
| 服务端基础搭建               | 第 7 - 20 天    | 2025 年 3 月 25 日 - 2025 年 4 月 13 日 | 构建服务端基础框架，连接数据库             | 1. 在 `node - server` 中使用 Express 搭建服务端框架 2. 配置 PostgreSQL 数据库连接，创建学生、教师、考试记录等相关数据表 3. 实现基本的 CRUD 接口，用于学生和教师信息的增删改查 |
| 管理员端登录与连接扫描仪功能 | 第 21 - 30 天   | 2025 年 4 月 14 日 - 2025 年 4 月 23 日 | 开发管理员端登录和连接扫描仪功能           | 1. 在 `vue - electron - admin` 中实现管理员登录界面，添加加密和验证逻辑 2. 使用 TWAIN 技术实现连接扫描仪功能，添加连接成功或失败的提示信息 |
| 创建考试与名单导入功能       | 第 31 - 44 天   | 2025 年 4 月 24 日 - 2025 年 5 月 16 日 | 开发创建考试和导入学生、教师名单功能       | 1. 在 `vue - electron - admin` 中实现创建考试界面，支持选择学校和年级创建考试，并能查看历史考试记录 2. 实现学生和教师名单（xlsx 文件）的导入功能，将数据存入 PostgreSQL 数据库 |
| 答题卡模板识别与区域设置     | 第 45 - 60 天   | 2025 年 5 月 17 日 - 2025 年 6 月 1 日  | 开发答题卡模板识别和区域设置功能           | 1. 在 `vue - electron - admin` 中实现导入答题卡模板功能，使用扫描仪获取模板图像并显示 2. 实现区域设置功能，包括准考证号、选择题、主观题区域的定位和划分，使用 OCR 技术进行选择题区域识别，使用 OpenCV 进行主观题题组分割 |
| 答题卡扫描与选择题处理       | 第 61 - 74 天   | 2025 年 6 月 2 日 - 2025 年 6 月 15 日  | 开发答题卡扫描功能，处理选择题             | 1. 在 `vue - electron - admin` 中实现答题卡扫描功能，实时显示扫卷数量、已扫答题卡图像和选择题得分 2. 处理扫描过程中的异常情况，如卡纸、图像倾斜等，并给出提示和解决方案 3. 实现选择题答案验证和分数计算，将学生姓名、考号和选择题分数传给后端保存 |
| 主观题题组分配               | 第 75 - 84 天   | 2025 年 6 月 16 日 - 2025 年 6 月 25 日 | 开发主观题题组分配功能                     | 1. 在 `vue - electron - admin` 中实现主观题题组分配功能，将题组分配给指定教师 2. 在 `node - server` 中实现题组分配逻辑，将分配信息保存到数据库 |
| 教师端登录与阅卷功能         | 第 85 - 100 天  | 2025 年 6 月 26 日 - 2025 年 7 月 11 日 | 开发教师端登录和阅卷功能                   | 1. 在 `vue - teacher` 中实现教师登录界面，使用手机号登录 2. 实现教师阅卷功能，教师可以看到被分配的题目并打分，将分数实时保存到 Redis 中 |
| 成绩计算与导出功能           | 第 101 - 110 天 | 2025 年 7 月 12 日 - 2025 年 7 月 21 日 | 开发成绩计算和导出功能                     | 1. 在 `node - server` 中实现学生各科成绩和总分的计算逻辑 2. 在 `vue - electron - admin` 中实现成绩导出功能，将所有学生的成绩导出为文件 |
| 测试与优化                   | 第 111 - 120 天 | 2025 年 7 月 22 日 - 2025 年 7 月 31 日 | 对整个系统进行测试和优化                   | 1. 对系统的各个功能模块进行功能测试，确保功能正常运行 2. 进行性能测试，优化系统性能，提高响应速度 3. 修复测试过程中发现的问题 |
| 学生端开发（可选）           | 第 121 - 140 天 | 2025 年 8 月 1 日 - 2025 年 8 月 20 日  | 开发学生端查成绩和成绩分析功能（如果需要） | 1. 在 `vue - student` 中实现学生查成绩和成绩分析功能，学生可以通过姓名和身份证号后 6 位查询成绩 |
| 收尾与总结                   | 第 141 - 142 天 | 2025 年 8 月 21 日 - 2025 年 8 月 22 日 | 项目收尾和总结                             | 1. 整理项目文档 2. 对项目进行总结，记录经验教训              |





