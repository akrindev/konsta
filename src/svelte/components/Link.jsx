<script>
import { cls } from '../../shared/cls.js';
import { useTheme } from '../shared/use-theme.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { useTouchRipple } from '../shared/use-touch-ripple.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';
import { LinkClasses } from '../../shared/classes/LinkClasses.js';

const Link = forwardRef((props, ref) => {
  const {
    component = 'a',
    className,
    colors: colorsProp,

    // Toolbar/navbar link
    navbar,
    toolbar,

    iconOnly,

    tabbar,
    tabbarActive,

    touchRipple = true,
    ios,
    material,

    onClick,

    // Children
    children,

    // Rest
    ...rest
  } = props;

  const rippleElRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: rippleElRef.current,
  }));

  const theme = useTheme({ ios, material });

  const dark = useDarkClasses();

  const needsTouchRipple =
    theme === 'material' && (toolbar || tabbar || navbar) && touchRipple;

  useTouchRipple(rippleElRef, needsTouchRipple);

  $: colors = {
    text: 'text-primary',
    tabbarInactive: cls(
      `text-black`,
      dark('dark:text-white dark:text-opacity-55')
    ),
    ...colorsProp,
  };

  const textColor =
    tabbar && !tabbarActive ? colors.tabbarInactive : colors.text;
  const tabbarState = tabbarActive ? 'active' : 'inactive';

  $: c = useThemeClasses(
    LinkClasses(props, { textColor, needsTouchRipple }, className)
  );

  $: classes = cls(
    // base
    c.base[tabbar ? 'default' : 'notTabbar'],

    toolbar && c.toolbar,

    navbar && c.navbar,

    tabbar && c.tabbar[tabbarState],

    className
  );

  return (
    <Component
      ref={rippleElRef}
      class={classes}
      {...$$restProps}
      onClick={onClick}
    >
      {theme === 'material' && tabbar && (
        <span class={c.tabbarHighlight[tabbarState]} />
      )}
      <slot />
    </Component>
  );
});

Link.displayName = 'Link';

export default Link;

</script>