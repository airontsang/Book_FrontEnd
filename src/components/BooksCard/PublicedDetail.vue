<template>
    <div>
        <x-header :right-options="{showMore: false }" @on-click-more="showMenus = true">{{ book.bookTitle }}</x-header>
        <form-preview :header-label="formTitle" :header-value="titleValue" :body-items="list"></form-preview>
        <div class="item-box">
            <ul>
                <li class="item-cell vux-1px-b" v-for="item in bookItems">
                    <div class="item-left">
                        <div class="item-tag">{{ item.tag }}</div>
                        <div class="two-info">
                            <span class="item-time">{{ item.happen_at }}</span>
                            <span class="item-content">{{ item.content }}</span>
                        </div>
                    </div>
                    <div class="item-right">￥{{ item.charge }}</div>
                </li>
            </ul>
        </div>
        <div v-transfer-dom>
            <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="cancelPublic" show-cancel></actionsheet>
        </div>
    </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, FormPreview } from 'vux'
import { Group, XInput, XTextarea } from 'vux'
import { index_book } from '../../state.js'
import moment from "moment"
import resource from '../../resource.js'
export default {
    directives: {
        TransferDom
    },
    data() {
        return {
            tag: 1,
            tick1: false,
            tick2: false,
            formTitle: "标题",
            titleValue: '',
            list: [{
                label: '创建时间',
                value: '-----'
            }, {
                label: '公示时间',
                value: '------'
            }, {
                label: '地点',
                value: '-------'
            }, {
                label: '简介',
                value: '------'
            }, {
                label: '聚会时间',
                value: '-----'
            }, {
                label: '总收款',
                value: '-----'
            }, {
                label: '总花费',
                value: '-----'
            }, {
                label: '余额',
                value: '-----'
            }, {
                label: '凭证ID',
                value: '-----'
            }, {
                label: '区块标识',
                value: '-----'
            }, {
                label: '全数据HASH',
                value: '-----'
            }],
            book: {},
            bookItems: [],
            menus: {
                menu1: '修改(修改后请重新公示)',
            },
            showMenus: false
        }
    },
    methods: {
        getBookInfo: function () {
            resource.onePublicedBook({
                bookId: this.$route.query.bookId
            }).then(res => {
                if (res.status === 200 && res.body.error_code === 0) {
                    this.book = res.body.data
                    for (var key in this.book) {
                        switch (key) {
                            case 'create_at':
                                this.list[0].value = moment(this.book[key]).format("YYYY-MM-DD HH:mm")
                                break;
                            case 'update_at':
                                this.list[1].value = moment(this.book[key]).format("YYYY-MM-DD HH:mm")
                                break;
                            case 'place':
                                this.list[2].value = this.book[key]
                                break;
                            case 'intro':
                                this.list[3].value = this.book[key]
                                break;
                            case 'partyTime':
                                this.list[4].value = moment(this.book[key]).format("YYYY-MM-DD HH:mm")
                                break;
                            case 'sum':
                                this.list[5].value = this.book[key]
                                break;
                            case 'spend':
                                this.list[6].value = this.book[key]
                                break;
                            case 'balance':
                                this.list[7].value = this.book[key]
                                break;
                            case 'evidenceId':
                                this.list[8].value = this.book[key]
                                break;
                            case 'bcHash':
                                this.list[9].value = this.book[key]
                                break;
                            case 'dbHash':
                                this.list[10].value = this.book[key]
                                break;
                        }
                        this.titleValue = this.book.title
                    }
                }
                this.tick1 = true;
            })
        },
        getBookItems: function () {
            resource.getAllBookItems({
                bookId: this.$route.query.bookId,
                pageIndex: 1,
                pageSize: 100
            }).then(res => {
                if (res.status === 200 && res.body.error_code === 0) {
                    res.body.data.forEach((item, index) => {
                        item.happen_at = moment(item.happen_at).format("MM-DD HH:mm")
                    })
                    this.bookItems = res.body.data;
                    alert(this.bookItems.length)
                    this.$vux.loading.hide()
                }
                this.tick2 = true;
                // for (var key in this.book) {
                //     switch (key) {
                //         case 'create_at':
                //             this.list[0].value = moment(this.book[key]).format("YYYY-MM-DD HH:mm")
                //             break;
                //         case 'update_at':
                //             this.list[1].value = moment(this.book[key]).format("YYYY-MM-DD HH:mm")
                //             break;
                //         case 'place':
                //             this.list[2].value = this.book[key]
                //             break;
                //         case 'intro':
                //             this.list[3].value = this.book[key]
                //             break;
                //         case 'partyTime':
                //             this.list[4].value = moment(this.book[key]).format("YYYY-MM-DD HH:mm")
                //             break;
                //         case 'sum':
                //             this.list[5].value = this.book[key]
                //             break;
                //         case 'spend':
                //             this.list[6].value = this.book[key]
                //             break;
                //         case 'balance':
                //             this.list[7].value = this.book[key]
                //             break;
                //         case 'evidenceId':
                //             this.list[8].value = this.book[key]
                //             break;
                //         case 'bcHash':
                //             this.list[9].value = this.book[key]
                //             break;
                //         case 'dbHash':
                //             this.list[10].value = this.book[key]
                //             break;
                //     }
                //     this.titleValue = this.book.title
                // }
            })
        },
        cancelPublic: function () {
            this.$vux.loading.show({
                text: '操作中'
            })
            resource.cancelPublic({
                bookId: this.$route.query.bookId
            }).then(res => {
                if (res.status === 200 && res.body.error_code === 0) {
                    this.$vux.loading.hide()
                    this.$vux.toast.show({
                        text: '请重新公示以或得数据保障',
                        type: 'success',
                        time: 2000
                    })
                    index_book.reset()
                    this.$router.push({ path: '/pending' })
                }
            })
        }

    },
    mounted: function () {
        this.$vux.loading.show({
            text: "加载中"
        })
        this.getBookInfo()
        window.setTimeout(
        this.getBookItems()
        , 200)
    },
    components: {
        XHeader,
        Actionsheet,
        FormPreview
    }
}

</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.item-box {
    margin-top: 10px;
}

.item-cell {
    padding: 10px;
    display: flex;
    background: #fff;
    align-items: center;
}

.item-all {
    .all-box {
        width: 70%;
    }
    .all-text {
        width: 25%;
        color: #999;
        text-align: right;
        margin-right: 10px;
    }
    .arrow-box {
        width: 5%;
    }
}

.item-left {
    display: flex;
    flex-direction: column;
    width: 80%;
    .two-info {
        font-size: .6em;
        color: #999;
    }
}

.item-right {
    width: 20%;
    text-align: right;
}
</style>