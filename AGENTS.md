# AGENTSとしてのルール

* 日本語を用いること。

## CloudFormation設計ルール

* frontend, backend, databaseの様に、各パート（1スタック=1パート）ごとにyamlを作成する。
* 各パートはSSM Parameter StoreにOutputsの内容を出力し、疎結合な状態とする。

## CloudFormation記述ルール

* パラメータに`ProjectName`と`Environment`、`PartName`を必ず含ませる。
* `PartName`はパラメータ化するだけで、ユーザーには操作させずDefault値（frontend, backend, database等の値）で運用する。
* リソース名は可能な限り、
  `${ProjectName}-${Environment}-{PartName}-{リソース（略称、-付与可）}`に統一する。
  * 例）S3バケットをfrontendパートで作成したら、`MyProject-dev-frontend-s3`という感じ。
* タグには可能な限り以下のタグを含ませる。
  * Name=`{リソース名}`
  * Project=`${ProjectName}`
  * Environment=`${Environment}`
  * Part=`${PartName}`
* Outputsと同等の内容をSSM Parameter Storeにも記載し、参照可能にする。
  * キーの命名は例えば、`/MyProject/dev/frontend/s3`。
* 操作されるためのアイデンティティポリシーは各パート内のyamlに記載する。
  * アイデンティティポリシーにアタッチするIAM Roleはパート内に作成しない。
* 操作する側のリソースでは、ロールを各パート内のyamlに記載し、
  SSM Parameter StoreのPolicyArnを参照してロールにアタッチして利用する。

## CloudFormation注意点

* `AWS::IAM::ManagedPolicy`にはTagは付けられない。
* `AWS::SSM::Parameter`のTag形式は`Key: Value`形式なので、`- Key: Name`と書かない。
  * （例）`Project: !Ref ProjectName`

## Memo

* ロールとポリシーのアタッチはリソースの作成順に関わるので、
  全てメインCFnをデプロイした後に後処理でアタッチ用CFnをデプロイする方針はどうだろうか？

## TODO

* database.yamlに上記のルールを適用させる。