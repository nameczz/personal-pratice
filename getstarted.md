# 学院公开课

GET /public_class/{page}/{limit}

_**取得公开课信息**_

|Path Param|Type|Required|Default|Description|Restriction|Example|
|-----------|----|--------|-------|-----------|-----------|-------|
|无|

#### 版本

1.0.0

#### 响应体

```json
{
    "data": {
        "sid": "",
        "status": 1,
        "code": 200,
        "msg": "获取数据成功！",
        "content": [
            {
                "title": "1111",
                "thumb": "",
                "url": "https://dev-x.zhihuiya.com/course/course_videos/view/id:489",
                "category": "专利检索",
                "lecturer": "",
                "created": "2017-07-25 13:45:29"
            }
        ]
    }
}
```

#### 响应体 json schema

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "definitions": {
    "video_array":{
      "items": {
        "properties": {
          "category": {
            "description": "分类名",
            "title": "分类名",
            "type": "string"
          },
          "created": {
            "description": "发布时间",
            "title": "发布时间",
            "type": "string"
          },
          "lecturer": {
            "description": "讲师名",
            "title": "讲师名",
            "type": "string"
          },
          "thumb": {
            "description": "缩略图地址",
            "title": "缩略图地址",
            "type": "string"
          },
          "title": {
            "description": "课程标题",
            "title": "课程标题",
            "type": "string"
          },
          "url": {
            "description": "课程链接",
            "title": "课程链接",
            "type": "string"
          }
        },
        "type": "object"
      }
    }
  },
  "id": "http://dev.zhihuiya.com/documents/public_class-schema.json",
  "properties": {
    "data": {
      "properties": {
        "code": {
          "description": "返回结果状态码",
          "title": "状态码",
          "type": "integer"
        },
        "msg": {
          "description": "返回结果信息",
          "title": "返回结果信息",
          "type": "string"
        },
        "sid": {
          "description": "客户端状态保持",
          "title": "sid",
          "type": "string"
        },
        "status": {
          "description": "返回成功与否状态",
          "title": "返回状态",
          "type": "integer"
        },
        "content": {
          "$ref":"#/definitions/video_array",
          "description": "课程列表"
        }
      },
      "type": "object"
    }
  },
  "type": "object"
}
```
