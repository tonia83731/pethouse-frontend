export const INTABLEHEADER = new Map([
  ["rpt_year", "年度"],
  ["rpt_month", "月份"],
  ["rpt_country", "縣市"],
  ["in_gg_num", "政府捕捉"],
  ["in_ms_num", "拾獲送交"],
  ["in_lv_num", "不擬續養"],
  ["in_bk_num", "認養退回"],
  ["in_re_num", "動物救援"],
  ["in_lw_num", "依法沒入"],
  ["in_els_num", "其他"],
]);
export const intablekeys = Array.from(INTABLEHEADER.keys());

export const OUTTABLEHEADER = new Map([
  ["rpt_year", "年度"],
  ["rpt_month", "月份"],
  ["rpt_country", "縣市"],
  ["out_tback_num", "領回"],
  ["out_ad_ca_num", "領養_個人認養"],
  ["out_ad_fa_num", "領養_民間犬場"],
  ["out_ad_cv_num", "領養_動保團體"],
  ["out_hs_3_num", "動保法12-1-3"],
  ["out_hs_5_num", "動保法12-1-5"],
  ["out_hs_7_num", "動保法12-1-7"],
  ["out_hs_ot_num", "其他法令授權"],
  ["out_sd_num", "疾病死亡"],
  ["out_jd_num", "生理耗弱死亡"],
  ["out_rl_num", "釋回原地"],
  ["out_ec_num", "逃脫"],
  ["out_el_num", "其他"],
]);
export const outtablekeys = Array.from(OUTTABLEHEADER.keys());

export const STAYTABLEHEADER = new Map([
  ["rpt_year", "年度"],
  ["rpt_month", "月份"],
  ["rpt_country", "縣市"],
  ["max_stay_dog_num", "可留容犬最大值"],
  ["end_dog_max_percent", "犬_在養占可留容比例"],
  ["max_stay_cat_num", "可留容貓最大值"],
  ["end_cat_max_percent", "貓_在養占可留容比例"],
]);
export const staytablekeys = Array.from(STAYTABLEHEADER.keys());

export const FEEDTABLEHEADER = new Map([
  ["rpt_year", "年度"],
  ["rpt_month", "月份"],
  ["rpt_country", "縣市"],
  ["fs_gg_num", "前月_收容所"],
  ["fs_ms_num", "前月_委託代養"],
  ["fs_sum_num", "前月_合計"],
  ["fe_gg_num", "本月_收容所"],
  ["fe_ms_num", "本月_委託代養"],
  ["fe_sum_num", "本月_合計"],
]);
export const feedtablekeys = Array.from(FEEDTABLEHEADER.keys());

export const getTableData = (datas: any, keys: string[]) => {
  const data = datas.map((item: any) => {
    const row: any = {};
    for (let key of keys) {
      row[key] = item[key];
    }
    return row;
  });
  return data;
};

export const tableOptions = [
  {
    label: "入所方式",
    value: "in",
  },
  {
    label: "出所方式",
    value: "out",
  },
  {
    label: "在養數",
    value: "feed",
  },
  {
    label: "可收留數",
    value: "stay",
  },
];
