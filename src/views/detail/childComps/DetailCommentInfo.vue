<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <span class="header-title">用户评价</span>
      <span class="header-more">更多</span>
      <i class="arrow-right"></i>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "@/common/util";

  export default {
  	name: "DetailCommentInfo",
    props: {
  	  commentInfo: {
  	    type: Object,
      }
    },
    filters: {
  	  showDate: function (value) {
        let date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped="scoped">
  .comment-info{
    margin: 5px 12px;
    /* border: 1px solid red; */

  }
  .info-header{
    /* border: 1px solid red; */
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-more{
    float: right;
  }
  .info-user{
    padding: 10px 0 5px;
  }
  .info-user img{
    width: 50px;
    height: 50px;
    border-radius: 100px;
  }
  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
