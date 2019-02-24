import * as React from "react"

interface BaseCardProps{

}

export abstract class BaseCard<TProps extends BaseCardProps, TModel> extends React.Component<TProps, TModel> {
}