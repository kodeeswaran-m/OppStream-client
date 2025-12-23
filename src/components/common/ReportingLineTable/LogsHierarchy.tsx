

export const transformData = (data: any[]): NodeType[] => {
  return data.map((am): NodeType => ({
    id: am.accountManagerId,
    name: am.accountManagerName,
    role: "ACCOUNT_MANAGER",
    logs: am.logs,

    children: am.reportingManagers.map((rm: any): NodeType => ({
      id: rm.reportingManagerId,
      name: rm.reportingManagerName,
      role: "REPORTING_MANAGER",
      logs: rm.logs,

      children: rm.employees.map((emp: any): NodeType => ({
        id: emp.employeeId,
        name: emp.employeeName,
        role: "EMPLOYEE",
        logs: emp.logs,
      })),
    })),
  }));
};

import HierarchyAccordion, { type NodeType } from "./HierarchyAccordion";

type Props = {
  data: any[];
};

export default function LogsHierarchy({ data }: Props) {
  const treeData: NodeType[] = transformData(data);

  return (
    <>
      {treeData.map((node: NodeType) => (
        <HierarchyAccordion key={node.id} node={node} />
      ))}
    </>
  );
}
