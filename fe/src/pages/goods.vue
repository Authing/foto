<template>
  <div class="goodsPage normalPage">
    <el-row :gutter="22" style="width: 84%;margin: 0 8%;">
      <!-- 左侧商品详情 -->
      <el-col :span="10">
        <div class="goodsInfoContainer">
          <img v-lazy="goods.image ? goods.image : ''" />
          <div class="goodsName">{{ goods.name }}</div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="commentBox">
          <div class="commentTitle flex-row-between-center">
            <div>
              全部评论{{ comment.length > 0 ? '（' + comment.length + '）' : '' }}
            </div>
            <i
              v-if="userInfo.id"
              class="el-icon-circle-plus"
              style="font-size: 18px;color: #409eff;cursor: pointer;"
              @click="dialogVisible = true"
            />
          </div>
          <div v-if="!comment || comment.length == 0" class="noComment">
            评论空空如也，快抢沙发吧
          </div>
          <div
            v-if="comment.length > 0"
            v-for="(item, index) in comment"
            :key="index"
            class="commentItem flex-row-between-start"
          >
            <img
              class="userAvatar"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573645627412&di=b1b7a78628e7b464607e9b650c6b5457&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201705%2F07%2F20170507160711_uU3Zy.jpeg"
            />
            <div class="userComment">
              <div class="flex-row-between-start">
                <div style="font-size: 18px;font-weight: bold;line-height: 1;">
                  {{ item.user_info.username }}
                </div>
                <div style="color: gray;">{{ item.create_time }}</div>
              </div>
              <div style="color: gray;line-height: 1;">
                {{ item.star ? '评价：' + item.star + '星' : '暂无评价' }}
              </div>

              <div style="margin-top: 8px;">{{ item.body }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      title="创建评论"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        type="textarea"
        placeholder="请输入评论内容"
        v-model="commentWord"
        maxlength="100"
        show-word-limit
      />
      <div class="flex-row-start-center" style="margin-top: 11px;">
        <div style="margin-right: 8px;">您的评分</div>
        <el-input-number
          v-model="num"
          size="mini"
          @change="handleChange"
          :min="1"
          :max="5"
          label="您的评分"
        ></el-input-number>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitComment"
          >发表评论</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeNames: ['1'],
      goods: {},
      comment: [],
      dialogVisible: false,
      commentWord: '',
      num: 5
    }
  },

  methods: {
    ...mapActions('api', ['getGoodsDetail', 'getComment', 'addComment']),
    handleChange() {},

    handleClose() {},

    handleSubmitComment() {
      let user_id = this.userInfo.id
      let goods_id = this.$route.params.id
      this.addComment({
        body: this.commentWord,
        star: this.num,
        toy: goods_id,
        user: user_id,
        cb: res => {
          if (res.status == 201 && res.data) {
            this.$message({
              message: '发表成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.getComment({
              id: this.$route.params.id,
              cb: res => {
                if (res.data) {
                  this.comment = res.data
                  this.comment = this.comment.reverse()
                }
              }
            })
          }
        }
      })
    }
  },

  computed: {
    ...mapGetters('api', ['userInfo'])
  },

  mounted() {
    this.getGoodsDetail({
      id: this.$route.params.id,
      cb: res => {
        if (res.data) {
          this.goods = res.data
        }
      }
    })

    this.getComment({
      id: this.$route.params.id,
      cb: res => {
        if (res.data) {
          this.comment = res.data
          this.comment = this.comment.reverse()
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.goodsInfoContainer {
  width: 100%;
  object-fit: cover;
  line-height: 2;
  padding: 18px;

  overflow: hidden;
  border-radius: 5px;
  background: #fff;

  img {
    width: 100%;
    border-radius: 4px;
    object-fit: cover;
  }

  .goodsName {
    font-size: 16px;
    font-weight: bold;
  }

  .goodsPrice {
    width: 100%;

    font-size: 13px;
    color: #515a6e;

    span {
      color: #13b9fc;
      font-size: 20px;
      font-weight: bold;
    }

    div:nth-child(2) {
      color: #212121;
    }
  }
}

.commentBox {
  width: 100%;
  background: #fff;
  padding: 11px 18px;
  border-radius: 5px;
  line-height: 2;

  .commentTitle {
    width: 100%;
    border-bottom: 1px solid #f3f3f3;
    padding-bottom: 6px;

    margin-bottom: 6px;
    font-size: 15px;
    font-weight: bold;
  }
}

.commentItem {
  font-size: 13px;
  color: #515a6e;
  width: 100%;
  padding: 8px 0;

  .userAvatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .userComment {
    width: calc(100% - 64px);
  }
}

.noComment {
  width: 100%;
  margin: 33px 0;
  text-align: center;
  font-size: 13px;
  color: gray;
}
</style>
