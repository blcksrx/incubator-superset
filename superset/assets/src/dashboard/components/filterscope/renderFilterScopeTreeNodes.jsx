/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import cx from 'classnames';

import ChartIcon from '../../../components/ChartIcon';
import { CHART_TYPE } from '../../util/componentTypes';

function traverse({ currentNode, selectedChartId }) {
  if (!currentNode) {
    return null;
  }

  const { label, value, type, children } = currentNode;
  if (children && children.length) {
    const updatedChildren = children.map(child =>
      traverse({ currentNode: child, selectedChartId }),
    );
    return {
      ...currentNode,
      label: (
        <a
          className={cx(`filter-scope-type ${type.toLowerCase()}`, {
            'selected-filter': selectedChartId === value,
          })}
        >
          {type === CHART_TYPE && (
            <span className="type-indicator">
              <ChartIcon />
            </span>
          )}
          {label}
        </a>
      ),
      children: updatedChildren,
    };
  }
  return {
    ...currentNode,
    label: (
      <a
        className={cx(`filter-scope-type ${type.toLowerCase()}`, {
          'selected-filter': selectedChartId === value,
        })}
      >
        {label}
      </a>
    ),
  };
}

export default function renderFilterScopeTreeNodes({
  nodes = [],
  selectedChartId = 0,
}) {
  return nodes.map(node => traverse({ currentNode: node, selectedChartId }));
}
