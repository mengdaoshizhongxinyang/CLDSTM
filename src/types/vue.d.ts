/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-25 10:25:49
 * @Description: overwrite the original prompt of vue
 */
import "vue"
import {
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  ObjectEmitsOptions,
  ComponentOptionsMixin,
  PublicProps,
  ComponentOptionsWithObjectProps,
  ComponentOptionsWithoutProps,
  ComponentPublicInstance,
  ComponentOptionsBase,
  VNodeProps,
  AllowedComponentProps,
  ComponentCustomProps,
  EmitsOptions,
  ComputedOptions,
  MethodOptions,
  ComponentPropsOptions
} from "vue";
declare module "vue" {
  
  declare type ComponentPublicInstanceConstructor<T extends ComponentPublicInstance<Props, RawBindings, D, C, M> = ComponentPublicInstance<any>, Props = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions> = {
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
    new(...args: any[]): T;
  };

  declare type ExtractMixin<T> = {
    Mixin: MixinToOptionTypes<T>;
  }[T extends ComponentOptionsMixin ? 'Mixin' : never];

  declare type IntersectionMixin<T> = IsDefaultMixinComponent<T> extends true ? OptionTypesType<{}, {}, {}, {}, {}> : UnionToIntersection<ExtractMixin<T>>;

  declare type IsDefaultMixinComponent<T> = T extends ComponentOptionsMixin ? ComponentOptionsMixin extends T ? true : false : false;

  declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

  declare type OptionTypesType<P = {}, B = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Defaults = {}> = {
    P: P;
    B: B;
    D: D;
    C: C;
    M: M;
    Defaults: Defaults;
  };

  declare type OptionTypesKeys = 'P' | 'B' | 'D' | 'C' | 'M' | 'Defaults';

  declare type UnwrapMixinsType<T, Type extends OptionTypesKeys> = T extends OptionTypesType ? T[Type] : never;

  declare type EnsureNonVoid<T> = T extends void ? {} : T;

  declare type CreateComponentPublicInstance<
    P = {}, B = {}, D = {},
    C extends ComputedOptions = {},
    M extends MethodOptions = {},
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    E extends EmitsOptions = {},
    PublicProps = P,
    Defaults = {},
    MakeDefaultsOptional extends boolean = false,
    PublicMixin = IntersectionMixin<Mixin> & IntersectionMixin<Extends>,
    PublicP = UnwrapMixinsType<PublicMixin, 'P'> & EnsureNonVoid<P>,
    PublicB = UnwrapMixinsType<PublicMixin, 'B'> & EnsureNonVoid<B>,
    PublicD = UnwrapMixinsType<PublicMixin, 'D'> & EnsureNonVoid<D>,
    PublicC extends ComputedOptions = UnwrapMixinsType<PublicMixin, 'C'> & EnsureNonVoid<C>,
    PublicM extends MethodOptions = UnwrapMixinsType<PublicMixin, 'M'> & EnsureNonVoid<M>,
    PublicDefaults = UnwrapMixinsType<PublicMixin, 'Defaults'> & EnsureNonVoid<Defaults>> = ComponentPublicInstance<
      PublicP,PublicB, PublicD, PublicC, PublicM, E,
      PublicProps, PublicDefaults, MakeDefaultsOptional, ComponentOptionsBase<P, B, D, C, M, Mixin, Extends, E, string, Defaults>>;

  export declare type DefineComponent<
    PropsOrPropOptions = {},
    RawBindings = {},
    D = {},
    C extends ComputedOptions = ComputedOptions,
    M extends MethodOptions = MethodOptions,
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    E extends ObjectEmitsOptions = Record<string, any>,
    EE extends string = string,
    PP = VNodeProps & AllowedComponentProps & ComponentCustomProps,
    Props = Readonly<ExtractPropTypes<PropsOrPropOptions> & {[key in keyof E as `on${Capitalize<key>}`]?: E[key] }>,
    Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>
    > = ComponentPublicInstanceConstructor<
      CreateComponentPublicInstance<
        Props,
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        E,
        PP & Props,
        Defaults, true
      > & Props> & ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults> & PP;


  export declare type DefineComponent<
    PropsOrPropOptions = {},
    RawBindings = {},
    D = {},
    C extends ComputedOptions = ComputedOptions,
    M extends MethodOptions = MethodOptions,
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    E extends string[] = Record<string, any>,
    EE extends string = string,
    PP = VNodeProps & AllowedComponentProps & ComponentCustomProps,
    Props = Readonly<ExtractPropTypes<PropsOrPropOptions>>,
    Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>
    > = ComponentPublicInstanceConstructor<
      CreateComponentPublicInstance<
        Props,
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        E,
        PP & Props,
        Defaults, true
      > & Props> & ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults> & PP;

  export declare function defineComponent<
    Props = {},
    RawBindings = {},
    D = {},
    C extends ComputedOptions = {},
    M extends MethodOptions = {},
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    E extends EmitsOptions = ObjectEmitsOptions,
    EE extends string = string
  >(options: ComponentOptionsWithoutProps<Props, RawBindings, D, C, M, Mixin, Extends, E, EE>):
    DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE>;

  export declare function defineComponent<
    PropsOptions extends Readonly<ComponentPropsOptions>,
    RawBindings = {},
    D = {},
    C extends ComputedOptions = {},
    M extends MethodOptions = {},
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    E extends EmitsOptions = ObjectEmitsOptions,
    EE extends string = string
  >(options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>):
    DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>;

}