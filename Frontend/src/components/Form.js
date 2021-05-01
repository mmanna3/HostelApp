import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function Form({ defaultValues, children, onSubmit, resetOnChanged, ...otherAttr }) {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues });

  useEffect(() => {
    reset();
  }, [resetOnChanged, reset]);

  return (
    <FormProvider control={control} register={register}>
      <form onSubmit={handleSubmit(onSubmit)} {...otherAttr}>
        {/* {processContent(children)} */}
        {children}
      </form>
    </FormProvider>
  );

  // function processContent(contenido) {
  //   if (Array.isArray(contenido)) {
  //     return processContentAsArray(contenido);
  //   } else return ProcessHtmlTree(contenido);
  // }

  // function processContentAsArray(contenido) {
  //   return contenido.map((element, index) => {
  //     return ProcessHtmlTree(element, index);
  //   });
  // }

  // function ProcessHtmlTree(e, index, innerIndex) {
  //   if (hasNameProperty(e)) return addRegisterAttribute(e);

  //   if (Array.isArray(e)) {
  //     e = React.createElement('div', { key: `${index}-${innerIndex}` }, e);
  //   }

  //   if (isReactComponent(e)) e = instantiate(e);

  //   if (e == null) return e;

  //   if (hasNoChildren(e)) return addRegisterAttribute(e);

  //   var children = getChildren(e);

  //   var newChildren = children.map((child, innerIndex) => {
  //     return ProcessHtmlTree(child, index, innerIndex);
  //   });

  //   var key = `${index}-${innerIndex}`;
  //   if (e.key) key = e.key;

  //   return React.cloneElement(e, { ...{ ...e.props, key: key } }, newChildren);
  // }

  // function hasNameProperty(e) {
  //   return e.props && e.props.name;
  // }

  // function hasNoChildren(e) {
  //   return !e.props || !e.props.children;
  // }

  // function getChildren(a) {
  //   var children = [];
  //   if (Array.isArray(a.props.children)) children = a.props.children;
  //   else {
  //     children.push(a.props.children);
  //   }
  //   return children;
  // }

  // function addRegisterAttribute(e) {
  //   if (e.props && e.props.name) {
  //     return React.createElement(e.type, {
  //       ...{
  //         ...e.props,
  //         register: register(),
  //         key: e.props.name,
  //       },
  //     });
  //   } else return e;
  // }
}

// function instantiate(e) {
//   return e.type(e.props);
// }

// function isReactComponent(e) {
//   return typeof e.type === 'function';
// }
