<template>
  <el-row>
    <el-cascader :props="props" filterable v-model="value"></el-cascader>
    <el-button @click="refresh">刷新最新客户</el-button>
  </el-row>
</template>

<script>
import { isArray } from "util";
import { stringify } from "querystring";

export default {
  mounted() {
    let groupArray = localStorage.getItem("customer_group_array");
  },
  watch: {
    value(val) {
      console.log(val);
      this.$emit("input", val[val.length - 1]);
    }
  },
  data() {
    const self = this;
    return {
      value: null,
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.root) {
            let groupArray = localStorage.getItem("customer_group_array");
            if (groupArray) {
              console.log("已经存在", groupArray);
              resolve(JSON.parse(groupArray));
            } else {
              console.log("#", node);
              self.getRequest("/customer/getGroup").then(res => {
                if (res && isArray(res)) {
                  console.log(res);
                  const nodes = Array.from(res).map(item => ({
                    value: item.group_id,
                    label: item.group_name,
                    leaf: false
                  }));
                  console.log("nodes", nodes);
                  localStorage.setItem(
                    "customer_group_array",
                    JSON.stringify(nodes)
                  );
                  resolve(nodes);
                } else {
                  resolve([]);
                }
              });
            }
          } else {
            //下层节点
            console.log("click node ,", node);
            let groupId = node.value;
            let customerArray = localStorage.getItem(
              "customer_array_of_group_" + groupId
            );
            if (customerArray) {
              resolve(JSON.parse(customerArray));
            } else {
              //远程拉取
              self
                .getRequest("/customer/getAllSimple", { group_id: groupId })
                .then(res => {
                  if (res && isArray(res)) {
                    console.log(res);
                    const nodes = Array.from(res).map(item => ({
                      value: item.id,
                      label: item.name,
                      leaf: true,
                      hasChildren: false
                    }));
                    console.log("nodes", nodes);
                    localStorage.setItem(
                      "customer_array_of_group_" + groupId,
                      JSON.stringify(nodes)
                    );
                    resolve(nodes);
                  } else {
                    resolve([]);
                  }
                });
            }
          }
        }
      }
    };
  },
  methods: {
    refresh() {
      console.log("删除客户缓存");
      localStorage.removeItem("customer_group_array");
      let delKeyArray = [];
      for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(key);
        if (key.indexOf("customer_array_of_group_") == 0) {
          delKeyArray.push(key);
        }
      }
      delKeyArray.forEach(item => {
        localStorage.removeItem(item);
      });
    }
  }
};
</script>

<style>
</style>
