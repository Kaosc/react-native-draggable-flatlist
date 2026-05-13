import React from "react";
import {
  FlatListProps,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useAnimatedValues } from "./context/animatedValueContext";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  WithSpringConfig,
  SharedValue,
} from "react-native-reanimated";
import { DEFAULT_PROPS } from "./constants";

export type DragEndParams<T> = {
  data: T[];
  from: number;
  to: number;
};
type Modify<T, R> = Omit<T, keyof R> & R;

type DefaultProps = Readonly<typeof DEFAULT_PROPS>;

export type DraggableFlatListProps<T> = Modify<
  FlatListProps<T>,
  {
    data: T[];
    activationDistance?: number;
    animationConfig?: Partial<WithSpringConfig>;
    autoscrollSpeed?: number;
    autoscrollThreshold?: number;
    containerStyle?: StyleProp<ViewStyle>;
    debug?: boolean;
    dragItemOverflow?: boolean;
    keyExtractor: (item: T, index: number) => string;
    onDragBegin?: (index: number) => void;
    onDragEnd?: (params: DragEndParams<T>) => void;
    onPlaceholderIndexChange?: (placeholderIndex: number) => void;
    onRelease?: (index: number) => void;
    onScrollOffsetChange?: (scrollOffset: number) => void;
    renderItem: RenderItem<T>;
    renderPlaceholder?: RenderPlaceholder<T>;
    simultaneousHandlers?: React.Ref<any> | React.Ref<any>[];
    outerScrollOffset?: SharedValue<number>;
    onAnimValInit?: (animVals: ReturnType<typeof useAnimatedValues>) => void;
    itemEnteringAnimation?: any;
    itemExitingAnimation?: any;
    itemLayoutAnimation?: any;
    enableLayoutAnimationExperimental?: boolean;
    onContainerLayout?: (params: {
      layout: LayoutChangeEvent["nativeEvent"]["layout"];
      containerRef: React.RefObject<Animated.View | null>;
    }) => void;
  } & Partial<DefaultProps>
>;

export type RenderPlaceholder<T> = (params: {
  item: T;
  index: number;
}) => React.ReactElement;

export type RenderItemParams<T> = {
  item: T;
  getIndex: () => number | undefined; // This is technically a "last known index" since cells don't necessarily rerender when their index changes
  drag: () => void;
  isActive: boolean;
};

export type RenderItem<T> = (params: RenderItemParams<T>) => React.ReactNode;

export type AnimatedFlatListType = <T>(props: any) => React.ReactElement;

export type CellData = {
  measurements: {
    size: number;
    offset: number;
  };
};
